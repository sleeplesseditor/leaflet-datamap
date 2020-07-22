import { MapControl, withLeaflet } from 'react-leaflet';
import L from 'leaflet';
import './map.scss';

class Legend extends MapControl {
    createLeafletElement(props) {}

    componentDidMount(){
        const legend = L.control({ position: "bottomright" });

        const getColor = d => {
            let color = null;
            switch(d) {
                case 'Charge Your Car':
                    color = '#B6A6CA';
                    break;
                case 'Source London':
                    color = '#BD0026';
                    break;
                case 'POD Point':
                    color = '#FC814A';
                    break;
                case 'Chargemaster (POLAR)':
                    color = '#D282A6';
                    break;
                case 'Ecotricity (Electric Highway)':
                    color = '#64B6AC';
                    break;
                case 'ChargePoint Services':
                    color = '#EEC170';
                    break;
                case 'ChargePlace Scotland':
                    color = '#6D98BA';
                    break;
                case 'APT':
                    color = '#AF4319';
                    break;
                default: break;
            }
            return color;
          };
        

    legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        const grades = [
            {name: 'Charge Your Car'},
            {name: 'Source London'},
            {name: 'POD Point'},
            {name: 'Chargemaster (POLAR)'},
            {name: 'Ecotricity (Electric Highway)'},
            {name: 'ChargePoint Services'},
            {name: 'ChargePlace Scotland'},
            {name: 'APT'}
        ];
        let labels = [];

        for (let i = 0; i < grades.length; i++) {
            labels.push(
                `<p style="margin:-2px"><i style="background:${getColor(grades[i].name)}"></i> ${grades[i].name} </p>`
            );
        }

        div.innerHTML = labels.join("<br>");
    return div;
    };

        const { map } = this.props.leaflet;
        legend.addTo(map);
    }
}

export default withLeaflet(Legend)