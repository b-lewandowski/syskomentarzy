const http = require('http');
const path = require('path');
const fs = require('fs');

const host = '127.0.0.1';
const port = 5555;

function odpowiedz(req, res) {
    const plik = path.join(__dirname, 'index.html');
    const css = path.join(__dirname, 'style.css');
    const script = path.join(__dirname, 'script.js');
    const json = path.join(__dirname, 'comments.json');

    console.log(`REQ: ${req.method} ${req.url}`);

    if (req.url === '/') {
        fs.readFile(plik, (err, dane) => {
            if (!err) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(dane);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h3>Strona o podanym adresie nie istnieje</h3>');
            }
        });
    }

    else if (req.url === '/style.css') {
        fs.readFile(css, (err, dane) => {
            if (!err) {
                res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
                res.end(dane);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end();
            }
        });
    }
 
    else if (req.url === '/script.js') {
        fs.readFile(script, (err, dane) => {
            if (!err) {
                res.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8' });
                res.end(dane);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end();
            }
        });
    }

    else if (req.url === '/comments.json') {
        fs.readFile(json, (err, dane) => {
            if (!err) {
                res.writeHead(200, { 'Content-Type': 'application/json'});
                res.end(dane);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end();
            }
        })
    }

    else if (req.method === 'POST' && req.url === '/post') {
        let body = '';
    
        req.on('data', chunk => {
          body += chunk;
        });
    
        req.on('end', () => {
            const parsed = JSON.parse(body);
            console.log('Received data:', parsed);

            fs.readFile(json, (err, dane) => {
                var daneKoment = JSON.parse(dane);
                daneKoment.push(parsed)
                fs.writeFileSync(json, JSON.stringify(daneKoment))

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(parsed));
            });
        });
      } 
      
    else if (req.method === 'GET' && req.url === '/get') {
        fs.readFile(json, (err, dane) => {
            if (!err) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(JSON.parse(dane)));
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end();
            }
        })
      }

    else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h2>Brak zasobu</h2>');
    }
}

const serwerWWW = http.createServer(odpowiedz);

serwerWWW.listen(port, host, () => console.log(`Serwer WWW dziala pod adresem: ${host}:${port}`));