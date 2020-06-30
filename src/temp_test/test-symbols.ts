import { ImportMock } from '../import-mock';
import * as dummyImport from './dummy-class';
import * as dummyUserImport from "./uses-dummy-class";


const dummyUser = new dummyUserImport.default();
dummyUser.IterateDummy();
dummyUser.AsyncIterateDummy();

const mockedDummy = ImportMock.mockClass(dummyImport);

let lSyncIterator = syncNextScoped();
let lAsyncIterator = asyncNextScoped();

// @ts-ignore
mockedDummy.mock(Symbol.iterator, lSyncIterator); // TODO: Include symbols on class typings
// @ts-ignore
mockedDummy.mock(Symbol.asyncIterator, lAsyncIterator); // TODO: Research why Symbol.asyncIterator is not recognized
mockedDummy.mock("methodA", "bar");
mockedDummy.mock("methodB", 123);

const stubbedDummyUser2 = new dummyUserImport.default();
stubbedDummyUser2.IterateDummy();
stubbedDummyUser2.AsyncIterateDummy();


// Functions to allow closure of i
function syncNextScoped()
{
  let i = 0;

  return {
    next()
    {
      if (i++ < 10) {
        return { value: "string: " + i.toString(), done: false };
      }
      else {
        return { value: "string: " + i.toString(), done: true };
      }
    }
  }
}

function asyncNextScoped()
{
  let i = 0;

  return {
    next()
    {
      if (i++ < 10) {
        return Promise.resolve({ value: "string: " + i.toString(), done: false });
      }
      else {
        return Promise.resolve({ value: "string: " + i.toString(), done: true });
      }
    }
  }
}

// Call restore to reset all mocked objects to original imports
ImportMock.restore();
