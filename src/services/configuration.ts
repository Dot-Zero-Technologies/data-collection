import { readFileSync } from 'fs'
import { Configuration } from '../types/Configuration.d'

export let configuration: Configuration

const configurationPath = process.env.CONFIG_PATH || './config.json'
configuration = JSON.parse(readFileSync(configurationPath, 'utf8')) as Configuration
