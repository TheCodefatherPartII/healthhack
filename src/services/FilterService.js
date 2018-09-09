
export default class FilterService {
  static async getServicesInBounds(maps, services, poly) {
    return services.filter(service => maps.geometry.poly.containsLocation(
      new maps.LatLng(service.lat, service.lng),
      poly
    ))
  }
}