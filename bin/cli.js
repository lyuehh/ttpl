#!/usr/bin/env node

var program = require('commander')
var fs = require('fs')
var path = require('path')
var nunjucks = require('nunjucks')

program
  .version('0.1.0')
  .option('-t, --tpl [tpl]', 'template file')
  .option('-d, --data [data]', 'data file')
  .parse(process.argv)

if (program.tpl && program.data) {
  var tplStr = fs.readFileSync(program.tpl, {encoding: 'utf-8'})
  var data = JSON.parse(fs.readFileSync(program.data, {encoding: 'utf-8'}))

  try {
    var ret = nunjucks.renderString(tplStr, data);
    console.log(ret);
  } catch(e) {
    console.log('渲染出错，请检查模板和数据..')
    console.error(e)
  }

} else {
  console.log('ttpl --help')
}
