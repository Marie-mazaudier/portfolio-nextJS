export interface SiteSetting {
  data: {
    attributes: {
      contact_info: {
        address: string;
        email: string;
        id: string;
        phone: string;
      };
      footer: {
        copyright: string;
        id: string;
        links: Array<{
          id: string;
          link: string;
          text: string;
        }>;
      };
      header: {
        logo: {
          image: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
          link: string;
        };
        github: {
          icon: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
          link: string;
        };
        id: string;
        menu: Array<{
          link: string;
          icon: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        }>;
      };
      site_name: string;
    };
  };
}

export interface SettingsQueryResponse {
  siteSetting: SiteSetting;
}
