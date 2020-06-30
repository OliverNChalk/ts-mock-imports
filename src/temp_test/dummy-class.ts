export default class DummyClass implements IterableIterator<number> {

  private i: number = -1;

  public methodA(): string {
    return 'abc';
  }

  public methodB(): number {
    return 21;
  }

  public methodC(): () => void {
    return () => { return; };
  }

  public next(): IteratorResult<number> {
    if (++this.i < 10) {
      return {
        done: false,
        value: this.i
      }
    } else {
      return {
        done: true,
        value: null
      }
    }
  }

  [Symbol.iterator](): IterableIterator<number> {
    return this;
  }

  // @ts-ignore
  [Symbol.asyncIterator](): any {
    let i = 0;
    return {
      next() {
        if (i++ < 10) {
          return Promise.resolve({
            done: false,
            value: i
          })
        } else {
          return Promise.resolve({
            done: true,
            value: null
          })
        }
      }
    }
  }
}
