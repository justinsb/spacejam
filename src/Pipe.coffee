class Pipe

  constructor: (@stdout,@stderr)->
    @stdout.setEncoding "utf8"
    @stderr.setEncoding "utf8"

    @stdout.on "data", (data)=>
      log.info "stdout: #{data}"
      process.stdout.write data

    @stderr.on "data", (data)=>
      log.info "stderr: #{data}"
      process.stderr.write data

module.exports = Pipe
