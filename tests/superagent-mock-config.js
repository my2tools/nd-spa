'use strict'

module.exports = [
  {
    /**
     * regular expression of URL
     */
    pattern: 'http://localhost:9876(.*)',

    /**
     * returns the data
     *
     * @param match array Result of the resolution of the regular expression
     * @param params object sent by 'send' function
     * @param headers object set by 'set' function
     * @return {any} any
     */
    fixtures: function(match, params/* , headers*/) {
      /**
       * Returning error codes example:
       *   request.get('https://domain.example/404').end(function(err, res){
       *     console.log(err); // 404
       *     console.log(res.notFound); // true
       *   })
       */
      if (match[1] === '/404') {
        throw new Error(404)
      }

      /**
       * Checking on parameters example:
       *   request.get('https://domain.example/hero').send({superhero: "superman"}).end(function(err, res){
       *     console.log(res.body); // "Your hero: superman"
       *   })
       */

      if (match[1] === '/hero') {
        if(params['superhero']) {
          return 'Your hero:' + params['superhero']
        } else {
          return 'You didnt chose a hero'
        }
      }


      /**
       * Checking on headers example:
       *   request.get('https://domain.example/authorized_endpoint').set({Authorization: "9382hfih1834h"}).end(function(err, res){
       *     console.log(res.body); // "Authenticated!"
       *   })
       */

      if (match[1] === '/v0.1/dispatcher/test/1') {
        return {
          a: 1,
          b: 2
        }
      }
    },

    /**
     * returns the result of the GET request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    get: function(match, data) {
      return {
        body: data
      }
    },

    /**
     * returns the result of the POST request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    post: function(match, data) {
      return {
        code: 201,
        data: data
      }
    }
  }

]
