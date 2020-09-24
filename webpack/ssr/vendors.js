// Be extremely careful when you declare your react dll, some packages refer to react as a dependency and need
// to live in the react dll, otherwise react-hot-loader won't work correctly

// Be careful with react-hot-loader :
// React Hot Loader rely on a Babel transformation that register all exports in a global. That's why dependencies included in Webpack DLL will not work.
// https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md#rhl-is-not-working-with-webpack-dll

// do not put 'react-universal-component' in the dll, otherwise you'll have to define {loading: ...} to all your universal components and wrap them in a React Component

// do not put emotion in dll, otherwise you won't be able to modify styles in chrome devtools


export default {
    vendor: ['fetch-everywhere'],
    react: ['react', 'react-dom', 'recompose'],
    // redux: ['redux', 'redux-actions', 'redux-reducers-injector', 'redux-saga', 'redux-sagas-injector', 'redux-first-router', 'redux-first-router-link'],
    // emotion: ['emotion', 'create-emotion', 'create-emotion-styled'],
    common: ['history', 'lodash'],
};
