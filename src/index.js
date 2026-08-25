'use strict';

// NOTE: This file intentionally uses outdated, vulnerable versions of lodash,
// minimist, and axios (see package.json / README.md) to demonstrate
// CodeRabbit's dependency-vulnerability (SCA) scanning. Do not copy these
// patterns into production code.

const _ = require('lodash');
const minimist = require('minimist');
const axios = require('axios');

// --- minimist: parses untrusted CLI arguments (CVE-2020-7598, prototype pollution) ---
const argv = minimist(process.argv.slice(2));

let userConfig = {};
try {
  userConfig = argv.config ? JSON.parse(argv.config) : {};
} catch (err) {
  console.error('Invalid --config JSON:', err.message);
}

const defaultSettings = {
  role: 'guest',
  permissions: ['read'],
};

// --- lodash: merging untrusted input into an object (CVE-2020-8203, prototype pollution) ---
const settings = _.merge({}, defaultSettings, userConfig);
console.log('Resolved settings:', settings);

// --- axios: fetching a user-influenced URL (CVE-2020-28168, SSRF via redirects) ---
async function fetchRemoteResource(url) {
  if (!url) return;
  try {
    const response = await axios.get(url);
    console.log(`Fetched ${url} -> status ${response.status}`);
  } catch (err) {
    console.error(`Failed to fetch ${url}:`, err.message);
  }
}

if (argv.url) {
  fetchRemoteResource(argv.url);
}

module.exports = { settings };
