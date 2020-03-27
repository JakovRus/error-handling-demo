import {registerService} from "./registry";

export const GITHUB_SERVICE_NAME = 'GITHUB_SERVICE';

function getGithubService(fetcher) {
  return {
    getRepository: () => {
      return fetcher
        .url('users/JakovRus/events')
        .get()
        .json();
    }
  }
}

registerService(GITHUB_SERVICE_NAME, getGithubService);