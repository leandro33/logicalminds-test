import http from "./http-common";

class DataService {
  getPlayers(): Promise<any> {
    return http.get("/players");
  }

  getTeams(): Promise<any> {
    return http.get("/teams");
  }
}

export default new DataService();
