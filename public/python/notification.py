import sys
from win11toast import toast

# message = sys.argv[1] if len(sys.argv) > 1 else 'Novo agendamento!'
toast('Novo agendamento!', duration=10, icon_path='icon.ico', notification_title='Thermal Tech')