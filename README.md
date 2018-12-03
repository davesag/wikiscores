# wikiscores

A Command-line tool that extracts structured data about all of the US Supreme Court Cases since 2000.  Developed for my brother to use to harvest some data.

## Prerequisites

* [Node JS](https://nodejs.org) `brew install node` or `brew install nvm` then `nvm install 11.3.0` (or whatever is the most recent)

## Installation

```
npm i -g wikiscores
```

## Simple Usage

From a Terminal run

```
wikiscores
```

This will go to the [Lists_of_United_States_Supreme_Court_cases]() page in wikipedia and get a list of all of the 'Term Opinions'.  And for Each 'Term Opinion' it grabs the 'Cases', and for each Case it grabs some statistical data.

By default it will write it to a file `output.csv` but you can specify the relative file path via the `-o` flag.

```
wikiscores -o some/other/output.csv
```

It will create any folders necessary.

## Development

Fork this repo and use the `forked-git-flow` process as outlined in the [Contributing](CONTRIBUTING.md) notes.

### Branches

| Branch | Tests | Code Coverage | Comments |
| ------ | ----- | ------------- | ---------|
| `develop` | [] | [] | Latest Staging Release |
| `master` | [] | [] | Latest Production Release |

### Functional Requirements

Scrape a list of [Term Opinions](https://en.wikipedia.org/wiki/2000_term_opinions_of_the_Supreme_Court_of_the_United_States) from a [list of US Supreme Court Cases](https://en.wikipedia.org/wiki/Lists_of_United_States_Supreme_Court_cases), and from each one grab a list of individual cases.  For each case grab data in the form:

```
{
  "title": "Some title",
  "defaultSort": "Some default sort title",
  "length": <the length of the article in bytes>,
  "articleId": "Some numeric article id",
  "contentModel": "wikitext",
  "watchers": "The number of watchers or the phrase Fewer than 30 watchers",
  "edits": <number of edits>,
  "recentEdits": <number of recent edits>,
  "monthCount": <number of reads in the last month>,
  "createdAt": "date created",
  "creator": "The username of the original editor",
}
```
