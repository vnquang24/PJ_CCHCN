import { Action, action } from 'easy-peasy';

export interface CounterModel {
  count: number;
  increment: Action<CounterModel, number>;
}

const counterModel: CounterModel = {
  count: 0,
  increment: action((state, payload) => {
    state.count += payload;
  }),
};

export default counterModel;