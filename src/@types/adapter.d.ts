declare namespace Adapter {
  type DomainListener = (msg: Adapter.CDP.Res) => void;
  declare namespace CDP {
    interface Req<T = any> {
      id: number;
      method: string;
      params: T;
    }

    interface EventRes<T = any> {
      method: string;
      params: T;
    }

    // CommanRes/ErrorRes 接口统一在 onMessage 时把 method 字段补充上去了
    interface CommandRes<T = any> {
      id: number;
      result: T;
      method: string;
    }

    interface ErrorRes {
      id: number;
      method: string;
      error: {
        code: number;
        message: string;
      };
    }

    type Res = EventRes | CommandRes | ErrorRes;
    type Data = Req | Res;
  }
  declare namespace IWDP {}
  declare namespace Client {}

  type RegisterDomainListener = (domain: string, callback: Adapter.DomainListener) => void;

  type Channel = {
    sendMessage: (msg: Adapter.CDP.Req) => void;
    registerDomainListener: RegisterDomainListener;
  };

  type Connection<T> = {
    ws: T;
    customDomains: string[];
  };
  type ConnectionList = Connection[];
  type ConnectionListMap<T> = Map<string, ConnectionList<T>>;

  type Resolve<T> = (value: T) => TResult1 | PromiseLike<TResult1>;
  type Reject = (reason: unknown) => TResult2 | PromiseLike<TResult2>;
  type RequestPromiseMap = Map<
    string | number,
    {
      resolve: Resolve;
      reject: Reject;
    }
  >;
}
