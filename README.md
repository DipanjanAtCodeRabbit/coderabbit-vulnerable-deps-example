# CodeRabbit Vulnerable Dependencies Demo

This repository is a **deliberately vulnerable** Node.js project used to demonstrate CodeRabbit's
Software Composition Analysis (SCA) / dependency-vulnerability scanning capability. It is **not**
intended for production use, deployment, or as an example of good practice — every dependency
version below was pinned specifically because it carries a known, publicly disclosed CVE.

## What CodeRabbit should flag

When CodeRabbit reviews a PR or scans this repository, its dependency/security checks should
surface the following known vulnerabilities:

| Package    | Pinned version | Advisory        | Issue |
|------------|----------------|------------------|-------|
| `lodash`   | `4.17.15`      | CVE-2020-8203 / CVE-2019-10744 | Prototype pollution in `merge`/`mergeWith`/`defaultsDeep` |
| `minimist` | `0.0.8`        | CVE-2020-7598    | Prototype pollution via crafted CLI arguments |
| `axios`    | `0.19.0`       | CVE-2020-28168 / CVE-2019-10742 | Server-Side Request Forgery (SSRF) via redirect handling |

## Demo code

`src/index.js` contains small, realistic-looking usages of each vulnerable package so a scanner
(or a human reviewer) can see not just *that* the dependency is outdated, but *how* the unsafe
API surface (`_.merge` on user input, `minimist` parsing untrusted argv, `axios.get` following a
user-supplied URL) is actually exercised in application code.

## Running

```bash
npm install
node src/index.js --config '{"role":"admin"}'
```

## Remediation (for reference)

In a real project you would fix these findings by bumping to the patched versions:

- `lodash` >= `4.17.19`
- `minimist` >= `1.2.6`
- `axios` >= `0.21.1`

This repo intentionally leaves them unpatched so the vulnerable state is preserved for the demo.
