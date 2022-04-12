import dynamicLinks from '@react-native-firebase/dynamic-links';

export const dynamicEventLink = async (adminId, userEmail, companyName) => {
  const link = await dynamicLinks().buildLink({
    link: `https://obras.page.link/?link=https://beta.itunes.apple.com/v1/app/1591220376&apn=com.chopdawg.obras&isi=962194608&ibi=com.chopdawg.obras&st=Worker+Invitation&sd=We+are+going+to+installing+Obras+App&si=https://picsum.photos/200/300&adminId=${adminId}&userEmail=${userEmail}&company=${companyName}`,
    // domainUriPrefix is created in your Firebase console
    domainUriPrefix: 'https://obras.page.link',
    // optional setup which updates Firebase analytics campaign
    // "banner". This also needs setting up before hand
    analytics: {
      campaign: 'banner',
    },
  });
  return link;
};
