import obspython as obs
import datetime

interval  = 1
source_name = ""

# ------------------------------------------------------------

def DateTimeUpdate():
  global interval
  global source_name

  now = datetime.datetime.now()

  source = obs.obs_get_source_by_name("DateWeekdayMonthDayYear")
  if source is not None:
    settings = obs.obs_data_create()
    obs.obs_data_set_string(settings, "text", now.strftime("%A, %B %d, %Y"))
    obs.obs_source_update(source, settings)
    obs.obs_data_release(settings)
    obs.obs_source_release(source)
  else:
    print("\nError: You must create a Text with the handle 'DateWeekdayMonthDayYear'.")
    
  source = obs.obs_get_source_by_name("DateTimeMinutes")
  if source is not None:
    settings = obs.obs_data_create()
    obs.obs_data_set_string(settings, "text", now.strftime("%Y-%m-%d;%I:%M %p WST"))
    obs.obs_source_update(source, settings)
    obs.obs_data_release(settings)
    obs.obs_source_release(source)
  else:
    print("\nError: You must create a Text with the handle 'DateTimeMinutes'.")

def refresh_pressed(props, prop):
  DateTimeUpdate()

# ------------------------------------------------------------

def script_description():
  return "Updates the minute clock and day, month, and year."

def script_defaults(settings):
  obs.obs_data_set_default_int(settings, "interval", 1)
  obs.obs_data_set_default_string(settings, "source", "DateTimeMinutes")

def script_properties():
  props = obs.obs_properties_create()

  obs.obs_properties_add_int(props, "interval", "Update Interval (seconds)", 1, 3600, 1)

  p = obs.obs_properties_add_list(props, "source", "Text Source", obs.OBS_COMBO_TYPE_EDITABLE, obs.OBS_COMBO_FORMAT_STRING)
  sources = obs.obs_enum_sources()
  if sources is not None:
    for source in sources:
      source_id = obs.obs_source_get_id(source)
      if source_id == "text_gdiplus" or source_id == "text_ft2_source":
        name = obs.obs_source_get_name(source)
        obs.obs_property_list_add_string(p, name, name)

    obs.source_list_release(sources)

  obs.obs_properties_add_button(props, "button", "Refresh", refresh_pressed)
  return props

def script_update(settings):
  global interval
  global source_name

  interval  = obs.obs_data_get_int(settings, "interval")
  source_name = obs.obs_data_get_string(settings, "source")

  obs.timer_remove(DateTimeUpdate)
  
  if source_name != "":
    obs.timer_add(DateTimeUpdate, interval * 1000)
