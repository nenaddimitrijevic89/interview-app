import { baseAPI } from '../shared/baseApi';
import { CandidateObj } from '../entities/CandidateObj';

class ServiceCandidate {

    getCandidates() {
        return baseAPI.get('candidates')
            .then(response => response.data)
            .then(candidateList => {
                let newCandidateList = candidateList.map(candidate => new CandidateObj(candidate))
                return newCandidateList;
            })
            .catch(error => console.log(error))
    }
    getCandidatesInfo(id) {
        return baseAPI.get(`candidates/${id}`)
            .then(candidate => new CandidateObj(candidate.data))
            .catch(error => console.log(error))
    }
}

export const serviceCandidate = new ServiceCandidate();