use reqwest::Url;
use std::fs;
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    println!("Donwloading Comics...👇👇👇");
    for comic_id in 2650..2660 {
        let url_formated = format!("https://xkcd.com/{}/info.0.json", comic_id);
        println!("{}",url_formated);
        let url = Url::parse(&*url_formated)?; 
        let resp = reqwest::get(url)
            .await?
            // .json::<HashMap<String, String>>()
            .text()
            .await?;
        let file_name =  format!("./comics/{}.json", comic_id);
        fs::write(file_name, resp).unwrap();
    }
    println!("Finished...✅");
    Ok(())
}
