const fs = require('fs');

module.exports = app => {
    app.get('/', (req,res) => {
        function isFolder(path)
        {
            return fs.lstatSync(path).isDirectory() && fs.existsSync(path);
        }

        const base = './files/';
        let path = '';

        if('path' in req.query)
        {
            path = req.query.path;
        }

        //если переданный параметр папка
        if(isFolder(base + path))
        {
            //Читает содержимое каталога
            let files = fs.readdirSync(base+path).map(item => {
                const isDir = fs.lstatSync(base + path + '/' + item).isDirectory();
                let size = 0;
                if(!isDir)
                {
                    size = fs.statSync(base + path + '/' + item);
                    console.log(`size ${size}`);
                }

                return{
                    name: item,
                    dir : isDir,
                    size: size.size ?? 0
                };
            })
            res.json({
                path : path,
                result: true,
                files : files
            });
        }
        else 
            res.end('Main page');
    })
}