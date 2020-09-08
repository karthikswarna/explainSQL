const fs = require('fs');

var nle = '';

fs.readFile('./ast.json', (err, data) => 
{
    if(err)
        throw err;
    
    var ast = JSON.parse(data);
    console.log(ast);
    ast["statement"].forEach(parse);
    console.log(nle);
});

function parse(ast)
{
    if(ast["type"] == "statement")
    {
        if(ast["variant"] == "select")
        {
            nle += 'Select the rows with ';
            parseSelect(ast);
        }
        else if(ast["variant"] == "update")
        {
            parseUpdate(ast);
        }
        else if(ast["variant"] = "insert")
        {
            parseInsert(ast);
        }
        else if(ast["variant"] = "delete")
        {
            parseDelete(ast);
        }
    }
}

function parseSelect(statement)
{
    var isColumn = false;
    statement["result"].forEach((obj, index, statement) => 
    {
        if(obj["type"] == "identifier" && obj["variant"] == "column")
        {
            if(!isColumn)
            {
                    if(statement.length > 1)
                    nle += 'the columns ';
                else
                    nle += 'the column ';
            }

            nle += obj["name"]
            if(obj.hasOwnProperty("alias"))
                nle += '(with an alias "' + obj["alias"] + '") ';

            if(index != statement.length - 1)
            {
                if(nle[nle.length - 1] == ' ')
                    nle = nle.slice(0, -1);
                nle += ', ';
            }
            else
                nle += ' ';

            isColumn = true;
        }
        else if(obj["type"] == "identifier" && obj["variant"] == "star")
        {
            nle += "all the columns "
        }
        else if(obj["type"] = "function")
        {
            if(nle[nle.length - 1] == ' ')
                nle = nle.slice(0, -1);

            nle += '(Find) the ' + obj["name"]["name"] + ' of the ';
            
            var result = obj["args"]["expression"][0]
            if(result["type"] == "identifier" && result["variant"] == "column")
                nle += result["name"] + "s ";
            
            if(obj.hasOwnProperty("alias"))
            {
                nle = nle.slice(0, -1);
                nle += '(with an alias "' + obj["alias"] + '") ';
            }
        }
    });
    
    if(statement.hasOwnProperty("from"))
        nle += "from the " + statement["from"]["name"] + ' table. ';
    
    if(statement.hasOwnProperty("where"))
    {
        nle = nle.slice(0, -2);
        nle += ", where each row has "
        parseWhere(statement["where"]);
    }
}

function parseInsert()
{

}

function parseUpdate()
{

}

function parseDelete()
{

}

function parseWhere()
{

}