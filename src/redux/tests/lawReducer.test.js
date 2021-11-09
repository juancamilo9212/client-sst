import {startGettingLaws,getLaws,errorGettingLaws,fetchLaws} from '../actions/lawsActions';
import {lawReducer} from '../reducers/lawReducer';

describe('Law actions and reducer tests', () => {

    describe('lawActions Tests', () => {

        it('Start getting law action Test', () => {
            const resultado = startGettingLaws();
            expect(resultado).toEqual({
                type:"START_GET_LAWS",
                error:false
            });
        });
    
        it('Getting law successfully action Test', () => {
            const resultado = getLaws(1);
            expect(resultado).toEqual({
                type:"GET_LAWS_SUCCESSFULLY",
                payload:1
            });
        });
    
        it('Error getting law action Test', () => {
            const resultado = errorGettingLaws("error");
            expect(resultado).toEqual({
                type:"ERROR_GETTING_LAWS",
                payload:"error",
                error:true
            });
        });

        /*it('fetchLaws thunk test. Happy path', async () => {
            const dispatch = jest.fn()
            //const getLawApi = jest.fn().mockResolvedValue();
            await fetchLaws(5)(dispatch);
            expect(dispatch.mock.calls).toEqual([
                [{
                    type:"START_GET_LAWS",
                    error:false
                }],
                [{
                    type:"GET_LAWS_SUCCESSFULLY",
                    payload:1
                }]
            ]);
        });*/
    });
    
    describe('Reducer Tests',() => {

        it('actionReducer => Start Get law Action', () => {
            const resultado = lawReducer([],{
                type: "START_GET_LAWS"
            });
            expect(resultado).toEqual({
                isLoading:true,
                error:null,
                laws:[]
            });
        });

        it('actionReducer => Get law Action successfully', () => {
            const resultado = lawReducer([],{
                type: "GET_LAWS_SUCCESSFULLY",
                payload: 1
            });
            expect(resultado).toEqual({
                isLoading:false,
                laws:1
            });
        });

        it('actionReducer => error Getting law Action successfully', () => {
            const resultado = lawReducer([],{
                type: "ERROR_GETTING_LAWS",
                payload: 1
            });
            expect(resultado).toEqual({
                isLoading:false,
                error:1
            });
        });
    });

});