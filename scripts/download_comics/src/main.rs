use reqwest::{ Url };
use std::fs::{ File, write, remove_file};
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::io::{Read};
use image::image_dimensions;

#[derive(Serialize, Deserialize)]
struct Base {
    month: String,
    num: i32,
    link: String,
    year: String,
    news: String,
    safe_title: String,
    transcript: String,
    alt: String,
    img: String,
    title: String,
    day: String,
}
#[derive(Serialize, Deserialize)]
struct Comic {
    month: String,
    num: i32,
    link: String,
    year: String,
    news: String,
    safe_title: String,
    transcript: String,
    alt: String,
    img: String,
    title: String,
    day: String,
    width: u32,
    height: u32,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    println!("Donwloading Comics...👇👇👇");
    for comic_id in 2610..2660 {
        let url_formated = format!("https://xkcd.com/{}/info.0.json", comic_id);
        println!("{}",url_formated);
        let url = Url::parse(&*url_formated)?;

        // Get Json from XKCD
        let resp = reqwest::get(url)
            .await?
            // .json::<HashMap<String, String>>()
            .text()
            .await?;
        let file_name =  format!("../../comics/{}.json", comic_id);
        
        // Write JSON
        write(&file_name, resp).unwrap();
        // Open File
        let mut file = File::open(&file_name)?;
        let mut contents = String::new();
        // Serialize string to JSON
        file.read_to_string(&mut contents)?;
        let base_data: Base = serde_json::from_str(&contents)?;
        // Download image
        let response = reqwest::get(&base_data.img).await?;
    
        let image_name = &response
            .url()
            .path_segments()
            .and_then(|segments| segments.last())
            .and_then(|name| if name.is_empty() { None } else { Some(name) })
            .unwrap_or("tmp.bin");
        
        let path_to_save_image = format!("./images/{}", &image_name);
        let image_content = response.bytes().await?;
        File::create(&path_to_save_image)?;
        write(&path_to_save_image,image_content)?;
        // Get domessions
        let image_dimensions = image_dimensions(&path_to_save_image);
        let (x, y) = match image_dimensions {
            Ok(v) =>  (v.0,v.1),
            Err(_e) => (0,0),
        };
        // Create JSON
        let comic_to_save = json!({
            "width": x,
            "height": y,
            "month": &base_data.month,
            "id": base_data.num,
            "link":base_data.link,
            "year":base_data.year,
            "news": base_data.news,
            "safe_title": base_data.safe_title,
            "transcript": base_data.transcript,
            "alt": base_data.alt,
            "img": base_data.img,
            "title": base_data.title,
            "day": base_data.day,
        });

        // Delete temp files
        remove_file(path_to_save_image)?;
        remove_file(&file_name)?;
        // Save Json
        write(file_name, comic_to_save.to_string()).unwrap();

        println!("{}", comic_to_save.to_string());
    }
    println!("Finished...✅");
    Ok(())
}
