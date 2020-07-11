import epgService from '../services';

const state = {
  all: {},
};

const actions = {
  get({ commit }: any, dateStr: string) {
    commit('getAllRequest');

    epgService.getProgrammes(dateStr)
      .then(
        (programmes) => commit('getAllSuccess', programmes),
        (error) => commit('getAllFailure', error),
      );
  },
};

const mutations = {
  getAllRequest(state: { all: { loading: boolean } }) {
    state.all = { loading: true };
  },
  getAllSuccess(state: any, programmes: any) {
    state.all = {
      items: programmes.programme.entries.filter((item) => item.title !== 'Encerramento' && item.media_id !== 101),
    };
  },
  getAllFailure(state: { all: { error: any } }, error: any) {
    state.all = { error };
  },
};

const programmes = {
  namespaced: true,
  state,
  actions,
  mutations,
};
export default programmes;
