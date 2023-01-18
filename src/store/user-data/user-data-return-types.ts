interface LoginReturnType {
  userId: string;
  token: string;
}

interface GetUserReturnType {
  userData: {
    email: string;
    phone: string;
    name: string;
    // setting: Settings?
  };
  connections: {
    id: string;
    name: string;
    phone: string;
  }[];
  inConReq: {
    id: string;
    name: string;
    phone: string;
  };
  outConReq: {
    id: string;
    phone: string;
  }[];
}
