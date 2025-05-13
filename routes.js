const fs = require('fs');


const requestHandler = (req, res) => {
     
console.log(req.url);
    if (req.url === '/') {
        res.write('<html>');
        res.write('<body><form action="/message"method="POST">  <input type = "text" name="message"> </input> <button>Send </button>  </form></body>')
        res.write('</html>')
        return res.end();
    }
    if (req.url === '/message' && req.method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk)
        })
       return req.on('end', () => {
            console.log(body);
            const parsedBody = Buffer.concat(body).toString()
            fs.writeFile('message.txt', parsedBody, (error) => {
                    res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
            }) 
        
        })
        // res.write('<html>');
        // res.write('<body> <h1> Hello my friend</h1></body>')
       
    }
}

module.exports = {requestHandler}