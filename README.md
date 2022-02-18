# Lisbon Metro React App
> This app aims to display some information from Lisbon Metro.

<!-- [![Build Status][travis-image]][gh-actions-url] -->

In this app we're going to point to [Metro Api Middeware][metro-api-middleware] in order to play around with some data from Lisbon Metro.

## Installation

```sh
git clone git@github.com:diconium/lisbon-metro-app-react.git
cd lisbon-metro-app-react
npm install
```

## Fire it up!

To start this app for development purposes:

```sh
npm start
```

If you're willing to deploy it (production) you should build it:

```sh
npm run build
```

and then deploy your newly created artifacts. Or maybe use your CI/CD to do that for you!

For more info on this please relay to CRA [documentation][cra-docs]

## Contributing

1. Fork it (<https://github.com/diconium/lisbon-metro-app-react.git>)
2. Create your feature branch (`git checkout -b feature/LISMETROAPP-<XXXX>-<desc>`)
    - where `<XXXX>` is the ticket number in case you're working on a existing ticket;
    - where `<desc>` being a small description;
3. Commit your changes (`git commit -am 'feat: added some fooBar'`)
    - try to use [Semantic Commit Messages][semantic-commit-messages] whenever possible;
4. Push to the branch (`git push origin feature/LISMETROAPP-<XXXX>-<desc>`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
<!-- [gh-actions-url]: https://travis-ci.org/dbader/node-datadog-metrics -->
[cra-docs]: https://create-react-app.dev/docs/getting-started
[metro-api-middleware]: https://github.com/diconium/lisbon-metro-app-middleware
[semantic-commit-messages]: https://sparkbox.com/foundry/semantic_commit_messages
