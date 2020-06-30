import * as dummyImport from './dummy-class';

export default class DummyUser {

  private mDummy: dummyImport.default;

  public constructor()
  {
    this.mDummy = new dummyImport.default();
  }

  public IterateDummy()
  {
    for (const num of this.mDummy)
    {
      console.log("iterated", num);
    }
  }

  public async AsyncIterateDummy()
  {
    for await (const num of this.mDummy)
    {
      console.log("async iterated", num);
    }
  }
}
