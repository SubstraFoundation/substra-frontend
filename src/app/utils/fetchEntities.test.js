/* globals fetch */

import {
    fetchEntitiesFactory,
    fetchEntityFactory,
    fetchEntitiesByPathFactory,
} from './fetchEntities';


global.API_URL = 'http://api';
global.fetch = jest.fn();
global.fetch.mockReturnValue(Promise.resolve());


describe('fetchEntitiesFactory', () => {
    test('should call fetch with correct parameters when called without jwt', () => {
        fetchEntitiesFactory('foo')({});
        expect(fetch).toHaveBeenCalledWith('http://api/foo/', {
            headers: {
                Accept: 'application/json;version=0.0',
                'Content-Type': 'application/json;',
            },
            mode: 'cors',
            credentials: 'include',
        });
    });

    test('should call fetch with correct parameters when called with jwt', () => {
        fetchEntitiesFactory('foo')({}, 'token');
        expect(fetch).toHaveBeenCalledWith('http://api/foo/', {
            headers: {
                Accept: 'application/json;version=0.0',
                'Content-Type': 'application/json;',
            },
            mode: 'cors',
            credentials: 'include',
        });
    });

    test('should call fetch with correct parameters when called with parameters and jwt', () => {
        fetchEntitiesFactory('foo')({page: 1}, 'token');
        expect(fetch).toHaveBeenCalledWith('http://api/foo/', {
            headers: {
                Accept: 'application/json;version=0.0',
                'Content-Type': 'application/json;',
            },
            mode: 'cors',
            credentials: 'include',
        });
    });

    test('should handle failed response', (done) => {
        global.fetch.mockReturnValue(Promise.resolve({
            ok: false,
            text: () => Promise.resolve('Run you fools !'),
        }));

        fetchEntitiesFactory('foo')({}).then((result) => {
            expect(result.error.message).toEqual('Run you fools !');
            done();
        }).catch(done);
    });

    test('should handle successfull response', (done) => {
        global.fetch.mockReturnValue(Promise.resolve({
            ok: true,
            json: () => ['data'],
        }));

        fetchEntitiesFactory('foo')({}).then((result) => {
            expect(result).toEqual({
                list: ['data'],
                status: undefined,
            });
            done();
        }).catch(done);
    });
});

describe('fetchEntityFactory', () => {
    test('should call fetch with correct parameters when called without jwt', () => {
        fetchEntityFactory('foo')({}, 'entityId');
        expect(fetch).toHaveBeenCalledWith('http://api/foo/entityId/', {
            headers: {
                Accept: 'application/json;version=0.0',
                'Content-Type': 'application/json;',
            },
            mode: 'cors',
            credentials: 'include',
        });
    });

    test('should call fetch with correct parameters when called with jwt', () => {
        fetchEntityFactory('foo')({}, 'entityId', 'token');
        expect(fetch).toHaveBeenCalledWith('http://api/foo/entityId/', {
            headers: {
                Accept: 'application/json;version=0.0',
                'Content-Type': 'application/json;',
            },
            mode: 'cors',
            credentials: 'include',
        });
    });

    test('should handle failed response', (done) => {
        global.fetch.mockReturnValue(Promise.resolve({
            ok: false,
            text: () => Promise.resolve('Run you fools !'),
        }));

        fetchEntityFactory('foo')('entityId').then((result) => {
            expect(result.error.message).toEqual('Run you fools !');
            done();
        }).catch(done);
    });

    test('should handle successfull response', (done) => {
        global.fetch.mockReturnValue(Promise.resolve({
            ok: true,
            status: 200,
            json: () => 'data',
        }));

        fetchEntityFactory('foo')('entityId').then((result) => {
            expect(result).toEqual({
                item: 'data',
                status: 200,
            });
            done();
        }).catch(done);
    });
});

describe('fetchEntitiesByPathFactory', () => {
    test('should call fetch with correct parameters when called without jwt', () => {
        fetchEntitiesByPathFactory('foo', 'view')({}, 1);
        expect(fetch).toHaveBeenCalledWith('http://api/foo/1/view/', {
            headers: {
                Accept: 'application/json;version=0.0',
                'Content-Type': 'application/json;',
            },
            mode: 'cors',
            credentials: 'include',
        });
    });

    test('should call fetch with correct parameters when called with jwt', () => {
        fetchEntitiesByPathFactory('foo', 'view')({}, 1, 'token');
        expect(fetch).toHaveBeenCalledWith('http://api/foo/1/view/', {
            headers: {
                Accept: 'application/json;version=0.0',
                Authorization: 'JWT token',
                'Content-Type': 'application/json;',
            },
            mode: 'cors',
            credentials: 'include',
        });
    });

    test('should call fetch with correct parameters when called with parameters and jwt', () => {
        fetchEntitiesByPathFactory('foo', 'view')({page: 1}, 1, 'token');
        expect(fetch).toHaveBeenCalledWith('http://api/foo/1/view/?page=1', {
            headers: {
                Accept: 'application/json;version=0.0',
                Authorization: 'JWT token',
                'Content-Type': 'application/json;',
            },
            mode: 'cors',
            credentials: 'include',
        });
    });

    test('should handle failed response', (done) => {
        global.fetch.mockReturnValue(Promise.resolve({
            ok: false,
            text: () => Promise.resolve('Run you fools !'),
        }));

        fetchEntitiesByPathFactory('foo', 'view')({}).then((result) => {
            expect(result.error.message).toEqual('Run you fools !');

            done();
        }).catch(done);
    });

    test('should handle successfull response', (done) => {
        global.fetch.mockReturnValue(Promise.resolve({
            ok: true,
            json: () => ['data'],
        }));

        fetchEntitiesByPathFactory('foo', 'view')({}).then((result) => {
            expect(result).toEqual({
                list: ['data'],
                status: undefined,
            });
            done();
        }).catch(done);
    });
});
