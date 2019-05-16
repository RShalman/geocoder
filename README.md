# Geocoder

#### _Script to find point's position with Yandex Geocoder service_.

### Attention! It's only availiable in Russian (temporarily)

---

## Before start

This program is intended to be used with command line so you should check if you have **Node.js** installed on your machine before using it.

In order to use this program you need to get API Key from [Yandex Developer Cabinet](https://developer.tech.yandex.ru) and insert it in `./package.json` file int line called **'apikey'**.

Lastly, you need to copy and paste your CSV/TSV file contents (file with your addresses) into `./src/static/data/addresses.tsv`.

**NOTE:** If this file is not empty - remove everything before pasting your data. Otherwise program will fetch & output both - the existed data in file + what you've pasted.

---

## Usage

Before start you should choose from **withDelay** and **withoutDelay** versions. It's important to know that
**withDelay** doesn't overwrites **result** file but appends new lines + it catches errors while **withoutDelay** lacks these opportunities (however it creates '**middle files**' such as **converted, responsed and filtered jsons** comparing back to **withDelay**).

After you've chosen the version, you can call one of them in further way:

Before running any version:

- in your code editor or command line utility, change directory to `geocoder-find-position` folder
- type `npm i` in console to install dependencies

if **withDelay**:

- type `npm run onerunner` in console to fetch data and get your CSV

if **withoutDelay**:

- type `npm run result` in console to fetch data and get your CSV
  - or (use strictly in furthermentioned order):
    > - type `npm run convert` in console to achieve converted JSON file of your addresses (from inital file of addresses)
    > - type `npm run position` in console to get a JSON with all responses from **Yandex Geocoder**
    > - type `npm run filter` in console to get a JSON filtered by **request name, response name, lat and lon**
    > - type `npm run csv` in console to convert filtered JSON to CSV

---

## Results

For both versions of program you will find results in `./src/static/data/result.csv`.<br>
For **withDelay** you will additionally find occurred errors written in `./src/static/data/errors.csv`.
