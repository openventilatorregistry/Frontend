- [Frontend](#frontend)
  - [Local Setup](#local-setup)
    - [1. Install](#1-install)
    - [2. Deploy](#2-deploy)
    - [3. Notes](#3-notes)
- [Styleguide](#styleguide)
    - [1. Functional Components](#1-functional-components)
    - [2. Hooks](#2-hooks)
    - [3. I need to fetch some data for my component. How should I do that?](#3-i-need-to-fetch-some-data-for-my-component-how-should-i-do-that)
    - [4. Stateful vs Stateless Components](#4-stateful-vs-stateless-components)
    - [5. Abstracting functionality](#5-abstracting-functionality)
    - [6. Props](#6-props)
    - [7. Imports](#7-imports)
    - [8. Named Exports](#8-named-exports)
    - [9. Directory Structure](#9-directory-structure)
    - [10. Conditional Rendering](#10-conditional-rendering)
    - [11. Styling](#11-styling)


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
$ npm install
```

Run the website locally with Parcel, using:

```console
$ npm start
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

# Styleguide

Follow our styleguide found in the eslint config file.

This styleguide is inspired by [this article](https://www.codeinwp.com/blog/react-best-practices/), which is recommended reading before continuing here. 

### 1. Functional Components

We are using functional components only. Class components are deprecated and should not be used. For more information on functional components,
see [the React docs on the difference](https://reactjs.org/docs/components-and-props.html#function-and-class-components),
or take a look at the [example component](#8-example-component).

### 2. Hooks

We will be using hooks to manage state and the React lifecycle. You can review hooks [here](https://reactjs.org/docs/hooks-intro.html).
Familiarize yourself with use of the `useState` and `useEffect` hooks in particular, and please be sure to know [the rules of hooks](https://reactjs.org/docs/hooks-rules.html)!

_(Note: Reference Redux docs for Redux hooks if Redux is brought into the project.)_

### 3. I need to fetch some data for my component. How should I do that?

Create a custom hook for the fetch. The hook should be stateful, and use an effect (with an appropriate dependency array)
to fetch, update the state, and finally, return the state.

For example:

```jsx
import { useEffect, useState } from 'react'

export const fetchVentilatorList = (hospitalId) => {
  const [ventilatorList, setVentilatorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const runEffect = async () => {
      try {
        setLoading(true);
        const resp = await fetch(`http://www.openventilatorregistry.org/api/ventilators?hospitalId=${hospitalId}`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer some-token',
          },
        });
        const payload = await resp.json();
        setVentilatorList(payload);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    );

    if (hospitalId) {
      runEffect();
    }
  }, [hospitalId]) // the dependency array is very important to avoid render loops!

  return [ventilatorList, loading, error];
}
```

Then consume the hook like so:

```jsx
export const Component = () => {
  const [ventilatorList, loading, error] = fetchVentilatorList('some-hospital-id')

  return (
    <div>
      {!!error && (<span>{e.message}</span>)}
      {!!loading && (<span>Loading...</span>)}
      {(!loading && !!ventilatorList.length) && ventilatorList.map((ventilator) => (
        <Ventilator key={ventilator.id} ventilator={ventilator} />
      ))}
    </div>
  )
}
```

Ensure your component is able to handle the initial (unfetched) return value of the hook (in our case, an empty array).

### 4. Stateful vs Stateless Components

A stateless component (a.k.a render component) is responsible only for displaying data from props and invoking any callbacks as a single element. These typically represent an atomic visual element in the browser (i.e. an input, image, or text field).

A stateful component is responsible for consuming and producing state, delegating it to stateless components, and orchestrating stateless component visiblity & lifecycle, etc. A stateful component represents a domain logical grouping of visual elements.

### 5. Abstracting functionality

Prefer functional components and composition. You shouldn't need anything else

### 6. Props

Prefer desctructuring props in the functional component body.

Prop typechecking will reduce bugs and enforce a clear component API.

```jsx
import PropTypes from 'prop-types';

const Greeting = (props) => {
  const { name } = props;

  return (
    <h1>Hello, {name}</h1>
  );
}

Greeting.propTypes = {
  name: PropTypes.string
};
```

### 7. Imports

Separate third-party and our own imports by a newline. 

### 8. Named Exports

Avoid default exports for import sanity.

### 9. Directory Structure

Pages are the root of a route. Components solely used in the page, place them under a folder named after the page under `components`. Any components used in more than one page goes under `common`.

example:

```
src/
  components/
    common/
      __tests__/
        APIUtils.spec.js
      Avatar.js
      APIUtils.js
    Feed/
      __tests__/
        FeedStory.spec.js
      index.js
      FeedStory.js
    Profile/
      index.js
      ProfileHeader/
        index.js
        Avatar.js
  pages/
    Feed.js
    Profile.js
```

### 10. Conditional Rendering

Use inline conditional rendering for optimization. Any exception must be carefully considered.

```jsx
export const Component = () => {
  const [ventilatorList, loading, error] = fetchVentilatorList('some-hospital-id')

  return (
    <div>
      {!!error && (<span>{e.message}</span>)}
      {!!loading && (<span>Loading...</span>)}
      {(!loading && !!ventilatorList.length) && ventilatorList.map((ventilator) => (
        <Ventilator key={ventilator.id} ventilator={ventilator} />
      ))}
    </div>
  )
}
```

### 11. Styling

Since we are using [Material UI](material-ui.com), we will be using their styling system - JSS. 

Never hard-code any dimensionality or positioning in the JSS - always use the theme.

Always use hooks:

```jsx
const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    color: theme.palette.common.black,
  }
}));
```
