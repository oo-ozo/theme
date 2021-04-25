var fs = require('fs')
var ex = require('./node_modules/express')
var path = require('path')
var bp = require('./node_modules/body-parser')
var f = fs.createReadStream('./newfile.cxx','utf8')
var shell = require("child_process").exec

const app = ex()
app.use('/', ex.static(path.join(__dirname, 'htdocs')))
app.use(bp.urlencoded({extended:false}))

app.get('/', (req, res)=>{
	res.sendFile(path.join(__dirname, '/', 'index.html'))
})

app.post('/test.php', (req, res)=>{
	var meta = "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">"
	var colord = "background: "+req.body.bg+"\nforeground: "+req.body.fg
	fs.writeFile("/data/data/com.termux/files/home/.termux/colors.properties", colord, function(err){
		if(err){
			throw err
			res.send(err)
		} else {
			shell("termux-reload-settings", function(err, stdo, stderr){
				res.send(meta+"Successfully changed exit termux and open")
				console.log("Successfully changed exit termux and open")
			})
		}
	})
})

app.listen(2000, ()=>console.log("listen at :http://localhost:2000"))
console.log("CRTL c to exit program");
