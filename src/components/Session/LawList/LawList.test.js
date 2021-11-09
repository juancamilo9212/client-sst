import React from 'react';
import {LawCard} from './LawList';
import Adapter from 'enzyme-adapter-react-16';
import {mount, configure} from 'enzyme';
import store from '../../../redux/store';
import {Provider} from 'react-redux';
import {SURA_URL} from '../../../api/config';

configure({adapter: new Adapter()}); 

describe('Menu Law Test suite', () => {
    
    it(`Should trigger verMas action When click on card's title button`, () => {
        const verMasButton = jest.fn();
        const law = {
            titulo:"Ley 2155 de 2021 Congreso ",
            texto:"Se expide la Ley de Inversión Social (Reforma Tributaria) Se expide la reforma tributaria que pretende contribuir a la reactivación económica, a la generación de empleo y a la estabilidad fiscal del país, con el propósito de proteger a la población más vulnerable contra el aumento de la pobreza, preservar el tejido empresarial y afianzar la credibilidad de las finanzas públicas.",
            idContenido:"459"
        }
        const wrapper = mount(
        <Provider store={store}>
            <LawCard
            verMasButton={verMasButton}
            law={law}
            />
        </Provider>
        );
        
        wrapper
        .find('button')
        .at(0)
        .simulate('click');
        
        expect(verMasButton.mock.calls).toEqual([[{...law}]]);
    });

    it(`Should see the url when inspect download button`, () => {
        const verMasButton = jest.fn();
        const law = {
            titulo:"Ley 2155 de 2021 Congreso ",
            texto:"Se expide la Ley de Inversión Social (Reforma Tributaria) Se expide la reforma tributaria que pretende contribuir a la reactivación económica, a la generación de empleo y a la estabilidad fiscal del país, con el propósito de proteger a la población más vulnerable contra el aumento de la pobreza, preservar el tejido empresarial y afianzar la credibilidad de las finanzas públicas.",
            idContenido:"459"
        }
        const wrapper = mount(
        <Provider store={store}>
            <LawCard
            verMasButton={verMasButton}
            law={law}
            />
        </Provider>
        );
        
       const arlLink = wrapper.find('a').at(0).html();
       expect(arlLink).toContain(`${SURA_URL}${law.idContenido}`);
    });

});
