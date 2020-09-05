const sqliteParser = require('sqlite-parser');
const fs = require('fs');

var query = 'select pants, shirts from laundry where pants.cost > 50 and shirts.cost  > 30;';

sqliteParser(query, (err, ast) => 
{
	if(err)
		throw err;
	
	console.log(ast);
	fs.writeFile('./ast.json', JSON.stringify(ast, null, '\t'), (err) => 
	{
		if(err) 
			throw err;
	});
});