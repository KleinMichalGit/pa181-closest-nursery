export type MapType = {
  schools: Array<{
    properties: {
      title: string;
      address: string;
      telephone: string;
      longitude: number;
      latitude: number;
      email: string;
    };
  }>;
};
