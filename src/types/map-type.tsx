export type MapType = {
  schools: Array<{
    properties: {
      objectid: number;
      title: string;
      address: string;
      telephone: string;
      longitude: number;
      latitude: number;
      email: string;
    };
  }>;
};

export type ClosestSchoolType = {
  properties?: {
    title: string;
    address: string;
    telephone: string;
    email: string;
    distance: number;
  };
};
