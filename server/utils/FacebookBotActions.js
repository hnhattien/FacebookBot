const { Builder, By, Key, until } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const cpp = require("copy-paste");
const chrome = require('selenium-webdriver/chrome');
const { Driver } = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');

class FacebookDriver{
    #driver = null
    constructor(){
        this.#driver = new webdriver.Builder()
        .forBrowser("chrome")
        .build();
        this.#driver.get('https://www.facebook.com');
        
    }

    postPureTextPost = async (postInfo, accountInfo) => {
        const {text} = postInfo;
            const {username, password} = accountInfo;
        try{
            
            
           
                try{
                    await this.#driver.wait(until.elementLocated({name: 'email'}), 200000)
                    await this.#driver.findElement(By.name('email')).sendKeys(username);
                    await this.#driver.findElement(By.name('pass')).sendKeys(password, Key.ENTER);
                   
                    await this.#driver.wait(until.elementLocated(By.xpath("//form[contains(@action, 'logout')]")),50000);
                    await this.#driver.sleep(2000);
                    await this.#driver.findElement(By.xpath("//body")).click();
                    await this.#driver.sleep(2000);

                    await this.#driver.findElement(By.xpath("//div[@role='button']//span[contains(text(), 'bạn đang nghĩ gì thế?')]")).click();
                    await this.#driver.wait(until.elementLocated(By.xpath('//form//span[contains(text(),"Đăng")]'), 500000));
                    await this.#driver
                    .findElement(By.xpath("//div[@contenteditable='true'][@role='textbox'][contains(@aria-label, 'bạn đang nghĩ gì thế?')]"), 500000)
                    .sendKeys(text);
                    await this.#driver.findElement(By.xpath('//form//span[contains(text(),"Đăng")]')).submit();

                    
               
                }catch(err){
                    console.log(err);       
                    await this.#driver.executeScript("document.title = 'Đóng sau 20 giây'");
                    await this.#driver.sleep(20000);
                    await this.#driver.close();
                    await this.#driver.quit();
                }
        
            
        }catch(err){
            console.log(err);
            await this.#driver.executeScript("document.title = 'Đóng sau 20 giây'");
            await this.#driver.sleep(20000);
            await this.#driver.close();
            await this.#driver.quit();
        }

        try{
            await this.#driver.executeScript("document.title = 'Đóng sau 20 giây'");
            await this.#driver.wait(until.elementLocated(By.xpath(`//*[text() = '${text}']`), 500000));
            await this.#driver.sleep(20000);
            await this.#driver.close();
            await this.#driver.quit();
        }
        catch(err){
            console.log(err);
        }
    }

    postImagePost = async (postInfo, accountInfo) => {
        const {text, image} = postInfo;
            const {username, password} = accountInfo;
            const filePath = path.join(process.cwd(), 'public', 'upload', image);
        try{
            

          
                try{
                    await this.#driver.wait(until.elementLocated({name: 'email'}), 200000)
                    await this.#driver.findElement(By.name('email')).sendKeys(username);
                    await this.#driver.findElement(By.name('pass')).sendKeys(password, Key.ENTER);
                  
                    await this.#driver.wait(until.elementLocated(By.xpath("//form[contains(@action, 'logout')]")),50000);
                    
                    await this.#driver.sleep(2000);
                    await this.#driver.findElement(By.xpath("//body")).click();
                    await this.#driver.sleep(2000);
                       
                    await this.#driver.findElement(By.xpath("//div[@role='button']//span[contains(text(), 'bạn đang nghĩ gì thế?')]")).click();
                    
                    await this.#driver.wait(until.elementLocated(By.xpath('//form//span[contains(text(),"Đăng")]'), 500000));
                    await this.#driver
                    .findElement(By.xpath("//div[@contenteditable='true'][@role='textbox'][contains(@aria-label, 'bạn đang nghĩ gì thế?')]")).click();

                    
                    await this.#driver.wait(until.elementLocated(By.xpath(`//*[@role='button'][@aria-label='Ảnh/Video']`), 500000));
                    await this.#driver.findElement(By.xpath(`//*[@role='button'][@aria-label='Ảnh/Video']`)).click();
                    const fileElement = await this.#driver.findElements(By.xpath("//*[@type='file']"));
                    await this.#driver.executeScript("arguments[0].forEach(el => {el.className='';})", fileElement);
                    await this.#driver.sleep(2000);
                    const imageInputEls = await this.#driver.findElements(By.xpath("//input[@type='file']"));
                    imageInputEls.forEach(el => {
                        el.sendKeys(filePath)
                    }) 
                    await this.#driver
                    .findElement(By.xpath("//div[@contenteditable='true'][@role='textbox'][contains(@aria-label, 'bạn đang nghĩ gì thế?')]"), 500000)
                    .sendKeys(text);
                    await this.#driver.wait(until.elementLocated(By.xpath(`//form//img[contains(@alt,'${postInfo.image}')]`), 500000));
                    await this.#driver.findElement(By.xpath('//form//span[contains(text(),"Đăng")]')).submit(); 
                   
                }catch(err){


                    console.log(err);       


                    await this.#driver.executeScript("document.title = 'Đóng sau 20 giây'");
                    await this.#driver.sleep(20000);
                    await this.#driver.close();
                    await this.#driver.quit();
                }
       
            
            
        }catch(err){
            console.log(err);

            await this.#driver.executeScript("document.title = 'Đóng sau 20 giây'");
            await this.#driver.sleep(20000);
            await this.#driver.close();
            await this.#driver.quit();
        }

        try{
            await this.#driver.executeScript("document.title = 'Đóng sau 20 giây'");
            await this.#driver.wait(until.elementLocated(By.xpath(`//*[text() = '${text}']`), 500000));
            await this.#driver.sleep(20000);
            await this.#driver.close();
            await this.#driver.quit();
        }
        catch(err){
            console.log(err);
        }
    }
}

module.exports = FacebookDriver;