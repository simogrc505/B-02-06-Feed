const {compose, bind, assoc, tap, prop, mergeDeepLeft, map} = require('ramda');

const repo = require('../models/repo/contents');
const repo_author = require('../models/repo/authors');
const repo_category = require('../models/repo/categories');
const input = require('../input-filters/content');
const error = require('../views/error');
const view = require('../views/content');

const {create_filters, append_headers} = require('../utilities/pagination');
const {upload_file} = require('../services/aws');

const feed = require('rss-to-json');

function convertRssIntoJson(rssFeed) {
    return new Promise((resolve, reject) => feed.load(rssFeed, function (err, rss) {
        if (err) {
            return reject(err);
        }
        return resolve(rss);
    }))
}

const request = require('request')
const fs = require('fs');

const create = (req, res) => {
    return convertRssIntoJson(req.body.rss_link)
        .then((rss) => rss.items.map(item => repo.create({
                external_id: item.guid._,
                created_at: new Date(item.pubDate).toISOString().slice(0, 19).replace('T', ' '), //new Date(item.pubDate).toISOString()
                title: item.title,
                description: item.description,
                link: item.link,
            }),
            rss.items.map(item => repo_author.create({
                    id: item.author
                }),
                rss.items.map(item => repo_category.create({
                        c_data: item.category._,
                        domain: item.category.domain
                    })
                ))
        ))
        .then((promises) => Promise.all(promises))
        //upload_file (deve avere come nome id in db)
        .then(compose(bind(res.status(201).json, res), view.one))
        .catch(error.generic(res))
}


const list = (req, res) => {
    let params = compose(
        mergeDeepLeft(req.query),
        assoc('page', 1),
        assoc('limit', 25),
        assoc('orderBy', 'created_at'),
        assoc('order', 'ASC')
    )({});

    repo
        .list(params)
        .then(create_filters(params))// ASSOC OFFSET E LIMIT AL RISULTATO DA PASSARE AD APPEND HEADERS(PER SETTARE I VARI CUSTOM HEADERS)
        .then(tap(append_headers(res)))
        .then(prop('results'))
        .then(compose(bind(res.json, res), view.many))
        .catch(error.generic(res))
};

let contents = require('express').Router();
contents.get('/',
    input.validate_contents_input,
    list
);

contents.post('/',
    input.validate_create_content_input,
    create
);

module.exports = contents;
