export type Nursery = {
  features: {
    type: string;
    id: number;
    geometry: {
      type: string;
      coordinates: [number, number];
    };
    properties: {
      objectid: number;
      school_id: number;
      title: string;
      director: string;
      website: string;
      email: string;
      telephone: string;
      address: string;
      longitude: number;
      latitude: number;
      school_capacity: number;
      applications: number;
      applications_locals: number;
      results_accepted: number;
      results_nonaccepted: number;
      results_other: number;
    };
  }[];
};
