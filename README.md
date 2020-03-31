# Frontend

A [React](https://reactjs.org) application onto a serverless website via the [Website Component](https://www.github.com/serverless-components/website).

It uses AWS S3 for hosting, AWS Cloudfront for a blazing fast CDN, AWS Route 53 to configure your custom domain and an AWS ACM Certificate to secure your with with SSL.

##  Local Setup 

1. [Install](#1-install)
2. [Deploy](#2-deploy)
3. [Notes](#3-notes)

&nbsp;

### 1. Install

Install the [Serverless Framework](https://www.github.com/serverless/serverless):

```console
$ npm i -g serverless
```

Add the access keys of an AWS IAM Role with `AdministratorAccess` in a `.env` file, using this format:

```bash
AWS_ACCESS_KEY_ID=1234
AWS_SECRET_ACCESS_KEY=1234
```

Or, you can set these as environment variables manually before deploying.

Install the NPM dependencies:

```console
$ npm i
```

Run the website locally with Parcel, using:

```console
$ npm run start
```

### 2. Deploy

Deploy via the `serverless` command:

```console
$ serverless
```

Use the `--debug` flag if you'd like to learn what's happening behind the scenes:

```console
$ serverless --debug
```

### 3. Notes

If you aren't using a custom domain, AWS Cloudfront and `HTTPS://` will not be set up. Instead, you will receive an `HTTP://` domain from AWS S3.

When you add a custom domain, AWS Cloudfront and `HTTPS://` will be set up automatically with it.

Remember, once you deploy with a custom domain for the first time, it may take up to an hour for DNS servers to propagate that change.

## React Styleguide

This styleguide is inspired by [this article](https://www.codeinwp.com/blog/react-best-practices/), which is recommended reading before continuing here. 

1. [Functional Components](#1-functional-components)
2. [Hooks](#2-hooks)
3. [Stateful vs Stateless Components](#3-stateful-vs-stateless-components)
4. [Abstracting Functionality](#4-abstracting-functionality)
5. [Proptypes](#5-proptypes)
6. [Named Exports](#6-named-exports)
7. [Directory Structure](#7-directory-structure)
8. [An Example Component](#8-an-example-component)

### 1. Functional Components

We are using functional components only. Class components are deprecated and should not be used. For more information on functional components,
see [the React docs on the difference](https://reactjs.org/docs/components-and-props.html#function-and-class-components),
or take a look at the [example component](#8-example-component).

### 2. Hooks

We will be using hooks to manage state and the React lifecycle. You can review hooks [here](https://reactjs.org/docs/hooks-intro.html).
Familiarize yourself with use of the `useState` and `useEffect` hooks in particular, and please be sure to know [the rules of hooks](https://reactjs.org/docs/hooks-rules.html)!

_(Note: Reference Redux docs for Redux hooks if Redux is brought into the project.)_

### I need to fetch some data for my component. How should I do that?

Create a custom hook for the fetch. The hook should be stateful, and use an effect (with an appropriate dependency array)
to fetch, update the state, and finally, return the state.

For example:

```jsx
import { useEffect, useState } from 'react'

export const fetchVentilatorList = (hospitalId) => {
  const [ventilatorList, setVentilatorList] = useState([])

  useEffect(() => {
    fetch(`http://www.openventilatorregistry.org/api/ventilators?hospitalId=${hospitalId}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer some-token',
      },
    })
      .then((resp) => resp.json())
      .then((payload) => setVentilatorList(payload))
      .catch(console.error)
  }, [hospitalId]) // the dependency array is very important to avoid render loops!

  return ventilatorList
}
```

Then consume the hook like so:

```jsx
export const Component = () => {
  const ventilatorList = fetchVentilatorList('some-hospital-id')

  return (
    <div>
      {ventilatorList.map((ventilator) => (
        <Ventilator ventilator={ventilator} />
      ))}
    </div>
  )
}
```

Ensure your component is able to handle the initial (unfetched) return value of the hook (in our case, an empty array).

### 3. Stateful vs Stateless Components

Keeping responsibilities clear

### 4. Abstracting functionality

HOCs vs render props vs props.children, etc

### 5. Proptypes

Sanity

### 6. Named Exports

Avoid default exports for import sanity? this may fall more under the coding styleguide's purview

### 7. Directory Structure

example from React docs:

```
common/
  Avatar.js
  Avatar.css
  APIUtils.js
  APIUtils.test.js
feed/
  index.js
  Feed.js
  Feed.css
  FeedStory.js
  FeedStory.test.js
  FeedAPI.js
profile/
  index.js
  Profile.js
  ProfileHeader.js
  ProfileHeader.css
  ProfileAPI.js
```

### 8. An Example Component

```jsx
// Show an inline example that follows all the rules

export const Component = () => (<div />)
```