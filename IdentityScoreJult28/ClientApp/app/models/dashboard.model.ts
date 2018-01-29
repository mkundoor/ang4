export class DashboardModel {
    options = [
        { name: 'OptionA', value: '1', checked: false },
        { name: 'OptionB', value: '2', checked: true },
        { name: 'OptionC', value: '3', checked: false }
    ]

    get selectedOptions() { // right now: ['1','3']
        return this.options
            .filter(opt => opt.checked)
            .map(opt => opt.value)
    }
}