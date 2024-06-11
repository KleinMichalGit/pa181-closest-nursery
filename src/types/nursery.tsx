import { SchoolProperties } from "@/types/map-type";

export type Geometry = {
  type: string;
  coordinates: [number, number];
};

export type Nursery = {
  features: Array<{
    type: string;
    id: number;
    geometry: Geometry;
    properties: SchoolProperties & {
      school_id: number;
      applications: number;
      applications_locals: number;
      results_accepted: number;
      results_nonaccepted: number;
      results_other: number;
    };
  }>;
};
