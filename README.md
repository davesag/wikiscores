# wikiscores

A Command-line tool that extracts structured data about all of the US Supreme Court Cases since 2000. Developed for my brother to use to harvest some data.

## Prerequisites

- [Node JS](https://nodejs.org) `brew install node` or `brew install nvm` then `nvm install 11.13.0` (or whatever is the most recent)

## Installation

Install `wikiscores` as a global module as follows:

```sh
npm i -g wikiscores
```

## Simple Usage

From a Terminal run

```sh
wikiscores
```

This will go to the [Lists_of_United_States_Supreme_Court_cases](https://en.wikipedia.org/wiki/Lists_of_United_States_Supreme_Court_cases) page in wikipedia and get a list of all of the 'Term Opinions'. And for Each 'Term Opinion' it grabs the 'Cases', and for each Case it grabs some statistical data.

## Options

1. By default it will write it to a file `output.csv` but you can specify the relative file path via the `-o` flag.
2. You can rate limit it with the `-r` option to specify the max number of requests per second.
3. You can limit the concurrency with the `-c` option to restrict the number of simultaneous requests.

```sh
wikiscores -o some/other/output.csv -r 10 -c 2
```

It will create any folders necessary.

```sh
wikiscores --help
```

for more info.

## Development

Fork this repo and use the `forked-git-flow` process as outlined in the [Contributing](CONTRIBUTING.md) notes.

### Branches

<!-- prettier-ignore -->
| Branch | Tests | Code Coverage | Comments |
| ------ | ----- | ------------- | ---------|
| `develop` | [![CircleCI](https://circleci.com/gh/davesag/wikiscores/tree/develop.svg?style=svg)](https://circleci.com/gh/davesag/wikiscores/tree/develop) | [![codecov](https://codecov.io/gh/davesag/wikiscores/branch/develop/graph/badge.svg)](https://codecov.io/gh/davesag/wikiscores) | Latest Staging Release |
| `master` | [![CircleCI](https://circleci.com/gh/davesag/wikiscores/tree/master.svg?style=svg)](https://circleci.com/gh/davesag/wikiscores/tree/master) | [![codecov](https://codecov.io/gh/davesag/wikiscores/branch/master/graph/badge.svg)](https://codecov.io/gh/davesag/wikiscores) | Latest Production Release |

### Functional Requirements

Scrape a list of [Term Opinions](https://en.wikipedia.org/wiki/2000_term_opinions_of_the_Supreme_Court_of_the_United_States) from a [list of US Supreme Court Cases](https://en.wikipedia.org/wiki/Lists_of_United_States_Supreme_Court_cases), and from each one grab a list of individual cases. For each case grab data in the form:

```js
{
  "term": 2002, // the term year
  "title": "Some title",
  "defaultSort": "Some default sort title",
  "length": 100, // the length of the article in bytes
  "articleId": 12345, // the numeric article id
  "contentModel": "wikitext",
  "watchers": 33, // The number of watchers, or the phrase 'Fewer than 30 watchers'
  "edits": 22, //number of edits
  "recentEdits": 20, // number of recent edits
  "monthCount": 55, // number of reads in the last month
  "createdAt": '2010-12-28T19:35:00.000Z', // date created in Zulu Time format"
  "creator": "The username of the original editor",
}
```

### Test it

- `npm test` — runs the unit tests (quick, runs offline)

### Lint it

```sh
npm run lint
```

## Contributing

Please see the [contributing notes](CONTRIBUTING.md).
