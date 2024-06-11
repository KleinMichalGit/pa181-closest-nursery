export type SchoolProperties = {
  objectid: number;
  title: string;
  address: string;
  telephone: string;
  longitude: number;
  latitude: number;
  email: string;
  director: string;
  website: string;
  school_capacity: number;
};

export type ClosestSchoolProperties = SchoolProperties & {
  distance: number;
};

export type MapType = {
  schools: Array<{
    properties: SchoolProperties;
  }>;
};

export type ClosestSchoolType = {
  properties?: ClosestSchoolProperties;
};
