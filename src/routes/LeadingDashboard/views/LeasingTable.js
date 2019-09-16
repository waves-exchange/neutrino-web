import React from 'react';
import './LeasingTable.scss'
import LeasingSlider from './LeasingTableSlider';
import Favorites from './LeasingTableFavorites';
import MiningShare from './LeasingTableMiningShare';
import LeasersPayouts from './LeasingTablePayouts';
import Button from 'yii-steroids/ui/form/Button';

import {html} from 'components';
const bem = html.bem('LeasingTable');


class LeasingTableRow extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {

        const { leaser: { address, website, miningShare, leasersPayouts, myLeasing }, index } = this.props;
        const num = index + 1;

        return (
            <div className={bem.element('tr')}>
                <div className={bem.element('td', 'num')}>
                    {num}
                </div>
                <div className={bem.element('td', 'favorites')}>
                    <Favorites />
                </div>
                <div className={bem.element('td', 'address')}>
                    {address}
                </div>
                <div className={bem.element('td', 'site')}>
                    <span>
                        {website.address}
                    </span>
                    <span>
                        {website.traffic}
                    </span>
                </div>
                <div className={bem.element('td', 'mining')}>
                    <MiningShare {...miningShare}/>
                </div>
                <div className={bem.element('td', 'payouts')}>
                    <LeasersPayouts {...leasersPayouts}/>
                </div>
                <div className={bem.element('td', 'leasing')}>
                    <LeasingSlider myLeasing={myLeasing}/>
                </div>
            </div>
        )
    }
}


export default class LeasingTable extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {

        const { leasers } = this.props;

        const rows = leasers.map((leaser, index) => <LeasingTableRow key={leaser.id} leaser={leaser} index={index} />)

        return (
            <div className={bem.block()}>
                <div className={bem.element('table')}>
                    <div className={bem.element('thead')}>
                        <div className={bem.element('tr')}>
                            <div className={bem.element('th', 'num')}></div>
                            <div className={bem.element('th', 'favorites')}></div>
                            <div className={bem.element('th', 'address')}>Address</div>
                            <div className={bem.element('th', 'site')}>Website</div>
                            <div className={bem.element('th', 'mining')}>Mining Share</div>
                            <div className={bem.element('th', 'payouts')}>Leasers payouts</div>
                            <div className={bem.element('th', 'leasing')}>My leasing</div>
                        </div>
                    </div>
                    <div className={bem.element('tbody')}>
                        {rows}
                    </div>
                    <div className={bem.element('tfoot')}>
                        <span className={bem.element('text')} >
                            USD-Neutrino and USD-Bonds holders are able to change the leassing configuration for collateralized balance in WAVES
                        </span>
                        <Button
                            type={'submit'}
                            className={bem.element('submit-button')}
                            label={'Apply'}
                        />
                        <input className={bem.element('btn', 'edit')} type='button' value='Edit'/>
                        <input className={bem.element('btn', 'apply')} type='button' value='Apply'/>
                    </div>
                </div>
            </div>
        )
    }
}
