var colors = require('colors');
var fs = require('fs');
var extfs = require('extfs');
var yesno = require('yesno');
var download = require('download-git-repo');

module.exports = function (options) {
  if(typeof options.type == 'undefined') {
    console.log(colors.green("No type provided, using default (full)"));
    console.log();
    options.type = "full";
  }
  checkForMP();
}

var dlMusiqPad = function () {
  download('musiqpad/mqp-server', process.cwd()+"/musiqpad"/* <- text is just for testing, will be removed at beta release*/, function(err) {
    if (err) {
      console.log(colors.red('Error: ')+err);
      process.exit()
    }
    else {
      console.log("Succesfully downloaded MusiqPad, now installing PadPlus.");
    }
  });
}

var dirIsEmpty = function () {
  var isEmpty = 0;
  extfs.isEmpty(process.cwd(), function (empty) {
    isEmpty = empty;
  });
  return isEmpty;
}

var checkForMP = function () {
  if(dirIsEmpty() == true) {
    console.log("MusiqPad is already installed or the dir isn't empty.");
    console.log("We will now install PadPlus to " + process.cwd());
    yesno.ask('Are you sure you want to continue? (y/n)', true, function(ok) {
        if(ok) {
            console.log("Ok, now installing PadPlus");
            installPadPlus();
        } else {
            process.exit();
        }
    });
  }
  else {
    dlMusiqPad();
  }
}
