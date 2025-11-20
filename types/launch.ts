export interface LaunchProps {
  id: string;
  mission_name: string;
  launch_date_utc: string;
  launch_success: boolean | null;
  rocket: {
    rocket_name: string;
  };
}

export interface LaunchListDataProps {
  launchesPast: LaunchProps[];
}

export interface LaunchDetailsProps {
  id: string;
  mission_name: string;
  details: string | null;
  launch_date_utc: string;
  launch_success: boolean | null;
  links: {
    article_link: string | null;
    video_link: string | null;
    wikipedia: string | null;
    flickr_images: string[];
  };
  rocket: {
    rocket_name: string;
    rocket_type: string;
    rocket: {
      description: string | null;
    };
  };
}
