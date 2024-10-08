import { Action, action } from 'easy-peasy';

export interface Disaster {
  id: number;
  title: string;
  description: string;
  icon: string;
  // Các trường khác của thảm họa
}

export interface DisasterModel {
  disasters: Disaster[];
  setDisasters: Action<DisasterModel, Disaster[]>;
}

const disasterModel: DisasterModel = {
  disasters: [],
  setDisasters: action((state, payload) => {
    state.disasters = payload;
  }),
};

export default disasterModel;