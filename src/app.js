'use strict'
import axios from 'axios'
import express from 'express'
import bodyParser from 'body-parser'
import { exec } from 'child_process'

const app = express()

//we assume the text ends in [xxxxx]
const parseGibberishAnswer = (stdout) => {
    let max = stdout.length - 2
    
    for (let i = max; i >= 0; i--) {
        if (stdout[i] === '[') {
            let substr = stdout.substring(i,max+1)
            return substr
        }
    }
}

const isGibberish = (textToTest) => {
    return new Promise((resolve, reject) => {
        exec(`nostril "${textToTest}"`, (error, stdout, stderr) => {
            if (error) {
                console.log(error)
                console.log("An error has occured")
                return reject(Error("An error has occured"))
            }

            if (stdout) {
                return resolve(parseGibberishAnswer(stdout))
            }

            if (sterr) {
                console.log(stderr)
                return reject(Error("Stderror: " + stderr))
            }
        })
    })
}

const startServer = () => {
    console.log("woot")
}

startServer()

isGibberish("jklasdjf;kl;lkk;lwerjkljkljk jkl///")
    .then( (textGibberishResult) => {
        console.log(textGibberishResult)
    } )
    .catch( (message) => {
        console.log("Something went wrong: " + message)
    })
